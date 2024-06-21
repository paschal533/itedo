// tools for editorjs

import Embed from '@editorjs/embed';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import AttachesTool from '@editorjs/attaches';
import { create as ipfsHttpClient } from "ipfs-http-client";
import {Buffer} from 'buffer';

import { uploadImage } from '../common/aws';

const UploadImagebyFile = (e) => {
    return uploadImage(e).then(url => {
        if (url) {
            return {
                success: 1,
                file: { url }
            };
        }
    })
}

const UploadImagebyURL = (e) => {
    let link = new Promise((resolve, reject) => {
        try {
            resolve(e)
        }
        catch(err) {
            reject(err)
        }
    })

    return link.then(url => {
        return {
            success: 1,
            file: { url }
        };
    })

}

const projectId = import.meta.env.VITE_REACT_APP_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = import.meta.env.VITE_REACT_APP_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const projectIdAndSecret = `${projectId}:${projectSecret}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64"
    )}`,
  },
});

const uploadToInfura = async (file) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://nft-kastle.infura-ipfs.io/ipfs/${added.path}`;

      return url;

    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

export const tools = {
    embed: {
        class: Embed,
    },
    list: {
        class: List,
        inlineToolbar : true
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByFile: UploadImagebyFile, 
                uploadByUrl: UploadImagebyURL
            }
        }
    },
    attaches: {
        class: AttachesTool,
        config: {
            uploader: {
                uploadByFile(file){
                    // your own uploading logic here
                    return uploadToInfura(file).then((response) => {
                      return {
                        success: 1,
                        file: {
                          url: response,
                          // any data you want
                          // for example: name, size, title
                        }
                      };
                    });
                }
                }
            }
        },
    header: {
        class: Header,
        config: {
            placeholder: 'Type Heading...',
            levels: [2, 3],
            defaultLevel: 2,
        },
    },
    quote: {
        class: Quote,
        inlineToolbar : true
    },
    marker: Marker,
    inlineCode: InlineCode,
}
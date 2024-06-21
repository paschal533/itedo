import React, { useEffect } from "react";
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import {HeartIcon} from "./player/HeartIcon";
import {PauseCircleIcon} from "./player/PauseCircleIcon";
import {NextIcon} from "./player/NextIcon";
import {PreviousIcon} from "./player/PreviousIcon";
import {RepeatOneIcon} from "./player/RepeatOneIcon";
import {ShuffleIcon} from "./player/ShuffleIcon";
import { useSpeechSynthesis } from 'react-speech-kit';

export default function BlogPlayer({ blog }) {
  const [liked, setLiked] = React.useState(false);
  const [text, setText] = React.useState('');
  const { speak, speaking, cancel } = useSpeechSynthesis();

  let { title, content, banner } = blog;

  useEffect(() => {
    const getText = () => {
        let result = ''
        content[0].blocks.map((block, i) => {
           if(block.type == "paragraph" || block.type == "header"){
             result = result + " " + block.data.text + "."
           }else if(block.type == "list"){
             block.data.items.map((item, i) => {
                result = result + " " + item +"."
             })
           }
        })

        let res = result.replace(/&nbsp;/g, " ")

        setText(res)
    }

    getText();
  }, [text])


  return (
    <Card
      isBlurred
      className="border-none mt-4 bg-background/60 dark:bg-default-100/50 drop-shadow-xl w-full"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover h-60"
              height={200}
              shadow="md"
              src={blog?.banner}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">{blog.title}</h3>
                <p className="text-small text-foreground/80">12 Tracks</p>
                <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <Slider
                aria-label="Music progress"
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                color="foreground"
                defaultValue={33}
                size="sm"
              />
              <div className="flex justify-between">
                <p className="text-small">1:23</p>
                <p className="text-small text-foreground/50">4:32</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <RepeatOneIcon className="text-foreground/80" />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <PreviousIcon />
              </Button>
              {!speaking ? (<Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={() => speak({ text: text })}
              >
                 <div className="bg-black dark:bg-white flex justify-center h-10 w-10 rounded-full items-center text-center">
                    <i className="fi fi-sr-play text-xl dark:text-black text-white"></i>
                 </div>
              </Button>) : (
                <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={() => cancel()}
              >
                 <div className="bg-black dark:bg-white flex justify-center h-10 w-10 rounded-full items-center text-center">
                    <i className="fi fi-sr-pause text-xl dark:text-black text-white"></i>
                 </div>
              </Button>
              )}
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <NextIcon />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <ShuffleIcon className="text-foreground/80" />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

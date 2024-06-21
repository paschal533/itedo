import React, { useEffect } from "react";
import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ChatCompletionRequestMessage } from "openai";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { BotAvatar } from "./bot-avatar";
import { Heading } from "./heading";
import { Button } from "./button";
import { Input } from "./input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./form";
import { cn } from "./utils";
import { Loader } from "./loader";
import { UserAvatar } from "./user-avatar";
import { Empty } from "./empty";
import { useProModal } from "./user-pro-modal";
import {ScrollShadow} from "@nextui-org/react";
// @ts-ignore
import AIimage from "../../imgs/ai.png";

import { formSchema } from "./constants";

const ConversationPage = ({ text }) => {
  const router = useNavigate();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      //@ts-ignore
      const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  const onSubmitload = async (values: string) => {
    if(values.length > 0){
      try {
        setLoading(true)
        const userMessage: ChatCompletionRequestMessage = {
          role: "user",
          content: values,
        };
        const newMessages = [...messages, userMessage];
  
        //@ts-ignore
        const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/conversation", {
          messages: newMessages,
        });
        setMessages((current) => [...current, userMessage, response.data]);
  
        form.reset();
        setLoading(false)
      } catch (error: any) {
        if (error?.response?.status === 403) {
          proModal.onOpen();
        } else {
          toast.error("Something went wrong.");
        }
      }
    }
  };


  return (
     <div>
      <div onClick={() => {onOpen(), onSubmitload(text)}} className="w-20 drop-shadow-2xl items-center cursor-pointer fixed h-20 !right-4 !bottom-4 flex justify-center rounded-full bg-[#5E4075] text-center text-2xl text-white">
         <img src={AIimage} className="filter invert w-10 h-10" alt="ai-image" />
       </div>
        <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
        className="h-[95vh]"
      >
        <ModalContent className="text-justify lg:!px-1">
          {(onClose) => (
            <>
              <ModalBody>
              <Heading
                    title="Conversation"
                    description="AI model."
                    icon={MessageSquare}
                    iconColor="text-violet-500"
                    bgColor="bg-violet-500/10"
                />
                <div>
                    <div>
                    <Form {...form}>
                        <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                            rounded-lg 
                            border 
                            w-full 
                            p-4 
                            px-3 
                            md:px-6 
                            focus-within:shadow-sm
                            grid
                            grid-cols-12
                            gap-2
                        "
                        >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                            <FormItem className="col-span-12 p-1 lg:col-span-12">
                                <FormControl className="m-0 p-0">
                                <Input
                                    className="border-0 outline-none text-black focus-visible:ring-0 focus-visible:ring-transparent"
                                    disabled={isLoading}
                                    placeholder="Say Hi! to ItedoAI"
                                    {...field}
                                />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <Button
                            className="bg-[#5E4075] col-span-12 lg:col-span-12 w-full"
                            type="submit"
                            disabled={isLoading}
                            size="icon"
                        >
                            Generate
                        </Button>
                        </form>
                    </Form>
                    </div>
                    <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader />
                        </div>
                    )}
                    {loading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && !loading && (
                        <Empty label="No conversation started." />
                    )}
                    <ScrollShadow className="w-full h-[400px]">
                    <div className="flex flex-col-reverse mb-40 gap-y-4 w-full">
                        {text.length > 0 ? messages.slice(1).map((message) => (
                        <div
                            key={message.content}
                            className={cn(
                            "p-4 w-full flex items-start gap-x-8 rounded-lg",
                            message.role === "user"
                                ? "bg-white border border-black/10"
                                : "bg-muted"
                            )}
                        >
                            {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                            <p className="text-sm">{message.content}</p>
                        </div>
                        )) : messages.map((message) => (
                          <div
                              key={message.content}
                              className={cn(
                              "p-4 w-full flex items-start gap-x-8 rounded-lg",
                              message.role === "user"
                                  ? "bg-white border border-black/10"
                                  : "bg-muted"
                              )}
                          >
                              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                              <p className="text-sm">{message.content}</p>
                          </div>
                          )) }
                    </div>
                    </ScrollShadow>
                    </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
     </div>
  );
};

export default ConversationPage;



// import { X } from "@tamagui/lucide-icons";
import { WebView } from "react-native-webview";
import { useState } from "react";
import { Text } from "tamagui";

import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Paragraph,
  Sheet,
  TooltipSimple,
  Unspaced,
  XStack,
} from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
// import { SelectDemoItem } from "./SelectDemo";
export default function DialogDemo({ annoucement }) {
  return <DialogInstance annoucement={annoucement} />;
}
function DialogInstance({ annoucement }) {
  console.log(annoucement);
  const [open, setOpen] = useState(false);
  if (annoucement) {
    return (
      <Dialog
        modal
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <Dialog.Trigger asChild>
          <Button>{annoucement["title"]}</Button>
        </Dialog.Trigger>
        <Adapt when="sm" platform="touch"></Adapt>
        <Dialog.Portal>
          <Dialog.Overlay key="overlay" />
          <Dialog.Content bordered elevate key="content" gap="$1" size={"$10"}>
            <Dialog.Title>{annoucement["title"]}</Dialog.Title>

            {/* <Dialog.Description>{annoucement["message"]}</Dialog.Description> */}
            <Fieldset>
              <SafeAreaView style={{ height: 500, width: 500 }}>
                <WebView
                  style={{
                    width: 500,
                    height: 500,
                    backgroundColor: "black",
                  }}
                  // source={{
                  //   html: annoucement["message"],
                  // }}
                  source={{
                    html: `<style>body{background-color:#232023;color: white;padding: 20; font-family:Arial;}span{background-color:#000!important;color:#fff!important}a:link{color: grey}</style>${annoucement["message"]}`,
                  }}
                />
              </SafeAreaView>
            </Fieldset>

            {/* <SelectDemoItem /> */}
            <XStack alignSelf="flex-end" gap="$4">
              <Dialog.Close displayWhenAdapted asChild>
                <Button theme="alt1" aria-label="Close" top="$5">
                  Close
                </Button>
              </Dialog.Close>
            </XStack>
            <Unspaced>
              <Dialog.Close asChild>
                <Button
                  position="absolute"
                  top="$6"
                  right="$3"
                  size="$2"
                  circular
                >
                  X
                </Button>
              </Dialog.Close>
            </Unspaced>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    );
  }
}

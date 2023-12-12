// import { X } from "@tamagui/lucide-icons";
import { WebView } from "react-native-webview";
import { useState } from "react";
import { H3, H4, Text, View } from "tamagui";
import * as DocumentPicker from "expo-document-picker";

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
import uploadFile from "../utils/uploadFile";
// import { SelectDemoItem } from "./SelectDemo";
export default function AssignemntModal({ assignment, name }) {
  return <DialogInstance assignment={assignment} name={name} />;
}
function DialogInstance({ assignment, name }) {
  const selectFileToSubmit = async () => {
    try {
      console.log("tried");
      const docRes = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });
      uploadFile(docRes["assets"][0]);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(assignment["name"]);
  const [open, setOpen] = useState(false);
  if (assignment) {
    return (
      <Dialog
        modal
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <Dialog.Trigger asChild>
          <Button>{assignment["name"]}</Button>
        </Dialog.Trigger>
        <Adapt when="sm" platform="touch"></Adapt>
        <Dialog.Portal>
          <Dialog.Overlay key="overlay" />
          <Dialog.Content
            bordered
            elevate
            key="content"
            gap="$1"
            size={"$8"}
            width={600}
          >
            <Dialog.Title>
              <H4 style={{ color: "white" }}>{assignment["name"]}</H4>
            </Dialog.Title>

            {/* <Dialog.Description>{annoucement["message"]}</Dialog.Description> */}
            <Fieldset>
              <SafeAreaView style={{ height: 400, width: 500 }}>
                <WebView
                  style={{
                    width: 500,
                    height: 400,
                    borderRadius: 20,
                    backgroundColor: "black",
                  }}
                  // source={{
                  //   html: annoucement["message"],
                  // }}
                  source={{
                    html: `<style>body{background-color:#232023;color: white;padding: 20; font-family:Arial;border-radius:300px}span{background-color:#000!important;color:#fff!important}a:link{color: grey}</style>${assignment["description"]}`,
                  }}
                />
              </SafeAreaView>
              <Button
                style={{ marginTop: 10 }}
                onPress={() => selectFileToSubmit()}
              >
                Submit Work
              </Button>
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

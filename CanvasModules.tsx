import { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, SafeAreaView } from "react-native";
import {
  Card,
  H3,
  Dialog,
  Fieldset,
  Button,
  H4,
  Adapt,
  XStack,
  Unspaced,
} from "tamagui";
import WebView from "react-native-webview";
interface ModulesResponse {
  AmoduleHeading: string;
  items_url: string;
  items: Array<{
    id: number;
    title: string;
    url: string;
  }>;
}

export function CanvasModules({ course_id }) {
  const [modules, setModuel] = useState<ModulesResponse[]>();
  const [open, setOpen] = useState(false);
  const url = `https://cths.instructure.com/api/v1/courses/${course_id}/modules?include[]=items&access_token=${process.env.CANVAS_API_TOKEN}`;
  // console.log(url);
  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((res) => setModuel(res));
  }, []);
  console.log(modules);
  return (
    <View>
      {modules &&
        modules.map((module: ModulesResponse, key) => {
          return module.items.map((individule, key) => (
            <View style={{ margin: 7 }} key={key}>
              <Dialog
                modal
                onOpenChange={(open) => {
                  setOpen(open);
                }}
              >
                <Dialog.Trigger asChild>
                  <Button style={{ height: 100 }}>Hello world </Button>
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
                      <H4 style={{ color: "white" }}>HELLLLOOO </H4>
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
                            html: `<style>body{background-color:#232023;color: white;padding: 20; font-family:Arial;border-radius:300px}span{background-color:#000!important;color:#fff!important}a:link{color: grey}</style>hello world`,
                          }}
                        />
                      </SafeAreaView>
                      <Button style={{ marginTop: 10 }}>Submit Work</Button>
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
            </View>
          ));
        })}
    </View>
  );
}

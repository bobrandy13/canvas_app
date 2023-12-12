import { useState } from "react";
import HTMLView from "react-native-htmlview";
import { Adapt, Button, Dialog, Unspaced, XStack } from "tamagui";

export function DialogInstance({ annoucement }) {
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
          <Dialog.Content bordered elevate key="content" gap="$1" size={"$14"}>
            <Dialog.Title>{annoucement["title"]}</Dialog.Title>

            <Dialog.Description>
              <HTMLView value={annoucement["title"]} />
              <Text>HEllo worlfd</Text>
            </Dialog.Description>

            {/* <SelectDemoItem /> */}
            <XStack alignSelf="flex-end" gap="$4">
              <Dialog.Close displayWhenAdapted asChild>
                <Button theme="alt1" aria-label="Close">
                  Save changes
                </Button>
              </Dialog.Close>
            </XStack>
            <Unspaced>
              <Dialog.Close asChild>
                <Button
                  position="absolute"
                  top="$3"
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

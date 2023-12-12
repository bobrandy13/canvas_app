import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import Modal from "../Components/Modal";
import { ScrollView } from "react-native-gesture-handler";
import { Accordion, Card, CardHeader, H3, H5, Text } from "tamagui";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const fetch_annoucements = async (course_id) => {
  const url = `https://cths.instructure.com/api/v1/announcements?context_codes[]=course_${course_id}&access_token=${process.env.CANVAS_API_TOKEN}`;
  console.log(url);
  const annoucements = await fetch(url);
  const response = await annoucements.json();
  return response;
};

function Annoucements({ course_id }) {
  console.log(course_id);
  const [accnoucements, setAnnoucements] = useState<Array<Object>>();
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["annouceemets"],
    queryFn: () => fetch_annoucements(course_id),
  });
  if (isLoading) console.log("loading");
  if (isSuccess) {
    console.log("data is ", data);
  }
  // replace
  return (
    <View
      style={{ flex: 1, paddingTop: StatusBar.currentHeight, height: "100%" }}
    >
      <ScrollView style={{ marginHorizontal: 20 }}>
        {data != null ? (
          data.map((annoucement, key) => {
            return (
              <Card
                key={key}
                style={{ margin: 6, position: "relative", top: 20 }}
              >
                <Modal annoucement={annoucement} />
                <CardHeader></CardHeader>
              </Card>
            );
          })
        ) : (
          <Text>Loading</Text>
        )}
      </ScrollView>
    </View>
  );
}

export default Annoucements;

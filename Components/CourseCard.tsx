import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Card, H2, H3, Theme } from "tamagui";
function CourseCard({ route, navigate, routeData }) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigate.navigate("landingPage", {
          courseName: route,
          courseData: routeData,
        })
      }
    >
      <Card
        elevate
        size="$4"
        bordered
        height={300}
        width={250}
        style={{ fontFamily: "Arial", color: "white" }}
      >
        <Card.Header>
          {/* <H3>{route.name}</H3> */}
          <Text style={{ color: "white" }}>{route}</Text>
        </Card.Header>
      </Card>
    </TouchableOpacity>
  );
}

export default CourseCard;

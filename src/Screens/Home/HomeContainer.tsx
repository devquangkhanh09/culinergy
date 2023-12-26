import { Home } from "./Home";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { ScrollView } from "react-native";

export const HomeContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return (
    <ScrollView>
      <Home data={data} isLoading={isLoading} />
    </ScrollView>
  );
};

import { Home } from "./Home";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { setFirstTime } from "@/Store/reducers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Store";

export const HomeContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  const useAppDispatch: () => AppDispatch = useDispatch
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setFirstTime())
  }, [])

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Home data={data} isLoading={isLoading} />;
};

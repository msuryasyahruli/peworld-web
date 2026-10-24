import { useDispatch, useSelector } from "react-redux";
import { getListWorker, getUser } from "../actions/userAction";
import { useEffect } from "react";

export const useUser = (refetch, id) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((s) => s.user.user);

  useEffect(() => {
    dispatch(getUser(id));
    // eslint-disable-next-line
  }, [refetch, id]);

  return {
    isLoading,
    data: data || [],
    isError,
  };
};

export const useListWorker = (params, refetch) => {
  const dispatch = useDispatch();
  const { data, pagination, isLoading, isError } = useSelector(
    (s) => s.user.listWorker,
  );

  useEffect(() => {
    dispatch(getListWorker(params));
    // eslint-disable-next-line
  }, [JSON.stringify(params), refetch]);

  return {
    isLoading,
    data: data || [],
    isError,
    pagination,
  };
};

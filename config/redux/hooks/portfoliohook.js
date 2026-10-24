import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPortfolio, getUserPortfolio } from "../actions/portfolioAction";

export const usePortfolio = (id) => {
  const dispatch = useDispatch();
  const { data, pagination, isLoading, isError } = useSelector(
    (s) => s.portfolio.portfolio,
  );

  useEffect(() => {
    dispatch(getPortfolio(id));
    // eslint-disable-next-line
  }, [id]);

  return { portfolio: data || [], pagination, isLoading, isError };
};

export const useUserPortfolio = (id, params, refetch) => {
  const dispatch = useDispatch();
  const { data, pagination, isLoading, isError } = useSelector(
    (s) => s.portfolio.userPortfolio,
  );

  useEffect(() => {
    dispatch(getUserPortfolio(id, params));
    // eslint-disable-next-line
  }, [id, JSON.stringify(params), refetch]);

  return { userPortfolio: data || [], pagination, isLoading, isError };
};

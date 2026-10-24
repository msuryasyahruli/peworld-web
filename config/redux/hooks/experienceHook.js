import { useDispatch, useSelector } from "react-redux";
import { getExperience, getUserExperience } from "../actions/experienceAction";
import { useEffect } from "react";

export const useExperience = (id) => {
  const dispatch = useDispatch();
  const { data, pagination, isLoading, isError } = useSelector(
    (s) => s.experience.experience,
  );

  useEffect(() => {
    dispatch(getExperience(id));
    // eslint-disable-next-line
  }, [id]);

  return { experience: data || [], pagination, isLoading, isError };
};

export const useUserExperience = (id, params, refetch) => {
  const dispatch = useDispatch();
  const { data, pagination, isLoading, isError } = useSelector(
    (s) => s.experience.userExperience,
  );

  useEffect(() => {
    dispatch(getUserExperience(id, params));
    // eslint-disable-next-line
  }, [id, JSON.stringify(params), refetch]);

  return { userExperience: data || [], pagination, isLoading, isError };
};

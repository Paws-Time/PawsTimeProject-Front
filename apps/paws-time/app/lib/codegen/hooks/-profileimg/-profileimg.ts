/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * BASIC PAWSTIME API
 * OpenAPI spec version: v1
 */
import { useMutation } from "@tanstack/react-query";
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import type { ApiResponseVoid, UpdateProfileImgBody } from "../../dtos";
import { customInstance } from "../../../axios-client/customClient";
import type { ErrorType, BodyType } from "../../../axios-client/customClient";

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

/**
 * 프로필 이미지를 변경할 수 있습니다.
 * @summary 프로필 이미지 변경
 */
export const updateProfileImg = (
  userId: number,
  updateProfileImgBody: BodyType<UpdateProfileImgBody>,
  options?: SecondParameter<typeof customInstance>,
) => {
  const formData = new FormData();
  formData.append("file", updateProfileImgBody.file);

  return customInstance<ApiResponseVoid>(
    {
      url: `/profileImg/${userId}`,
      method: "PUT",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    },
    options,
  );
};

export const getUpdateProfileImgMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateProfileImg>>,
    TError,
    { userId: number; data: BodyType<UpdateProfileImgBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof updateProfileImg>>,
  TError,
  { userId: number; data: BodyType<UpdateProfileImgBody> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof updateProfileImg>>,
    { userId: number; data: BodyType<UpdateProfileImgBody> }
  > = (props) => {
    const { userId, data } = props ?? {};

    return updateProfileImg(userId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type UpdateProfileImgMutationResult = NonNullable<
  Awaited<ReturnType<typeof updateProfileImg>>
>;
export type UpdateProfileImgMutationBody = BodyType<UpdateProfileImgBody>;
export type UpdateProfileImgMutationError = ErrorType<unknown>;

/**
 * @summary 프로필 이미지 변경
 */
export const useUpdateProfileImg = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateProfileImg>>,
    TError,
    { userId: number; data: BodyType<UpdateProfileImgBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof updateProfileImg>>,
  TError,
  { userId: number; data: BodyType<UpdateProfileImgBody> },
  TContext
> => {
  const mutationOptions = getUpdateProfileImgMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * 프로필 이미지를 삭제합니다.
 * @summary 프로필 이미지 삭제
 */
export const deleteProfileImg = (
  userId: number,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<ApiResponseVoid>(
    { url: `/profileImg/${userId}`, method: "DELETE" },
    options,
  );
};

export const getDeleteProfileImgMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteProfileImg>>,
    TError,
    { userId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteProfileImg>>,
  TError,
  { userId: number },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteProfileImg>>,
    { userId: number }
  > = (props) => {
    const { userId } = props ?? {};

    return deleteProfileImg(userId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteProfileImgMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteProfileImg>>
>;

export type DeleteProfileImgMutationError = ErrorType<unknown>;

/**
 * @summary 프로필 이미지 삭제
 */
export const useDeleteProfileImg = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteProfileImg>>,
    TError,
    { userId: number },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteProfileImg>>,
  TError,
  { userId: number },
  TContext
> => {
  const mutationOptions = getDeleteProfileImgMutationOptions(options);

  return useMutation(mutationOptions);
};

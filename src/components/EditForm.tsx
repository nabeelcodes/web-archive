import { Dispatch, SetStateAction } from "react";
import { Post } from "@/utils/types";

type EditFormProps = {
  postDetails: Post;
  modalHandler: Dispatch<SetStateAction<boolean>>;
};

const EditForm = ({}: EditFormProps) => {
  return <></>;
};

export default EditForm;

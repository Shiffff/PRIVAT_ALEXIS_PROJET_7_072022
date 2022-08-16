import { useSelector } from "react-redux";
import { isEmpty } from "../utils/utils";
import Card from "./Post/Card";










const Thread = () => {
  const postData = useSelector((state) => state.post.post);





  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(postData[0]) &&
          postData.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;

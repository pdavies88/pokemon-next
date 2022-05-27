import ImageSize from "../utils/image";

const CardSingle = (props) => {
  const { name, id, images } = props.card;
  return (
    <div>
      <div>
        {name} - {id}
      </div>
      <ImageSize src={images.small} imageSize="large" />
    </div>
  );
};
export default CardSingle;

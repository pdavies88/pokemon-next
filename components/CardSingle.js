const CardSingle = (props) => {
  const { name, id, images } = props.card;
  return (
    <div>
      <div>
        {name} - {id}
      </div>
      <div>
        <img src={images.small} />
      </div>
    </div>
  );
};
export default CardSingle;

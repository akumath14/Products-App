const Item = ({ item }) => {
    console.log('item comonent', item)
  const { name } = item;
  return (
      <li className='item'>{name}</li>
  );
};

export default Item;

import { useSelector, useDispatch } from 'react-redux';

import { actualChanelId } from '../../../../slices/actualChanelSlice';

import DropDownChanel from '../DropDownChanel/dropDownChanel';

import { Button } from 'react-bootstrap';

const ChanelButton = ({ chanel, handleModal }) => {
  const dispatch = useDispatch();
  const { id, name, removable } = chanel;
  const { chanelId } = useSelector((state) => state.actualChanelId);
  const handleClick = (id, name) => {
    dispatch(actualChanelId({ chanelId: id, name }));
  };

  const variant = id === chanelId ? 'secondary' : 'light';
  return (
    <>
      {!removable ? (
        <Button
          variant={variant}
          className="w-100 rounded-0 text-start"
          onClick={() => handleClick(id, name)}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      ) : (
        <DropDownChanel
          name={name}
          id={id}
          handleClick={handleClick}
          currentChanelId={chanelId}
          handleModal={handleModal}
        />
      )}
    </>
  );
};

export default ChanelButton;

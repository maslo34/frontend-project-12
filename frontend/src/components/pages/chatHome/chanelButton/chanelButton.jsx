import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import { actualChanelId } from '../../../../slices/actualChanelSlice';

import DropDownChanel from '../DropDownChanel/dropDownChanel';

const ChanelButton = ({ chanel, handleModal }) => {
  const dispatch = useDispatch();
  const { id, name, removable } = chanel;
  const { chanelId } = useSelector((state) => state.actualChanelId);
  const handleClick = (idChanel, chanelName) => {
    dispatch(actualChanelId({ chanelId: idChanel, name: chanelName }));
  };

  const variant = id === chanelId ? 'secondary' : 'light';
  return (
    !removable ? (
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
    )
  );
};

export default ChanelButton;

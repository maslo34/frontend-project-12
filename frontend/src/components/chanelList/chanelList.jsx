import { useDispatch } from 'react-redux';
import { setOptionModal } from '../../slices/modalSlice.js';
import { useGetChanelsApiQuery } from '../../slices/newChanelSlice.js';

import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import './chanelList.css';

const ChanelList = ({ hendleClickChanel, activeChenel }) => {

  const { data, error, isLoading } = useGetChanelsApiQuery();
  // console.log(data, error, isLoading, refetch, status);
  const dispatch = useDispatch();
  const optionsModal = (type, id = '', initialValue = '') => {
    dispatch(setOptionModal({isShow: true, type, id, initialValue}))
  }

  const selectActiveChanel = (id) =>
    activeChenel === id ? 'secondary' : 'light';
  if (error) {
    return;
  }
  return (
    <div className="chanel-conteiner">
      <div className="chanel-label">
        <h4>Каналы</h4>
        {error ? <div>{error}</div> : <></>}
        <Button onClick={() => optionsModal('addChanel')} variant="primary" size="sm">
          +
        </Button>
      </div>
      <ul className="chanel-list">
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          data.map((el) => (
            <li
              className="nav-item w-100"
              key={el.id}
              onClick={() => hendleClickChanel(el.id)}
            >
              <Dropdown as={ButtonGroup}>
                <Button
                  className="border-none w-100 text-start"
                  variant={selectActiveChanel(el.id)}
                >
                  <span># </span>
                  {el.name}
                </Button>
                <Dropdown.Toggle
                  split
                  variant={selectActiveChanel(el.id)}
                  className="border-none"
                />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => optionsModal('removeChanel', el.id)}>
                    Удалить
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => optionsModal('editChanel', el.id, el.name)}>
                    Переименовать
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ChanelList;

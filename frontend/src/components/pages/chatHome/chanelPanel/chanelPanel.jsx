import { useDispatch } from 'react-redux';
import { setOptionModal } from '../../../../slices/modalSlice.js';
import { useGetChanelsApiQuery } from '../../../../slices/newChanelSlice.js';

import ChanelButton from '../chanelButton/chanelButton.jsx';
import ChanelHeader from '../chanelHeader/chanelHeader.jsx';

import { Nav } from 'react-bootstrap';
import { t } from 'i18next';

const ChanelPanel = () => {
  const { data, error, isLoading } = useGetChanelsApiQuery();
  const dispatch = useDispatch();
  const optionsModal = (type, id = '', initialValue = '') => {
    dispatch(setOptionModal({ isShow: true, type, id, initialValue }));
  };

  if (error) {
    return;
  }
  return (
    <>
      <ChanelHeader handleModal={optionsModal} />
      {isLoading ? (
        <h1>{t('chatHome.loading')}</h1>
      ) : (
        <Nav
          as={'ul'}
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {data.map((chanel) => (
            <Nav.Item key={chanel.id} className="w-100" as="li">
              <ChanelButton chanel={chanel} handleModal={optionsModal} />
            </Nav.Item>
          ))}
        </Nav>
      )}
    </>
  );
};

export default ChanelPanel;

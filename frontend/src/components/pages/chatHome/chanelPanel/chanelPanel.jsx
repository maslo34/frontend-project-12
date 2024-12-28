import { useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { t } from 'i18next';

import { openModal } from '../../../../slices/modalSlice.js';
import { useGetChanelsApiQuery } from '../../../../slices/newChanelSlice.js';

import ChanelButton from '../chanelButton/chanelButton.jsx';
import ChanelHeader from '../chanelHeader/chanelHeader.jsx';

const ChanelPanel = () => {
  const { data, error, isLoading } = useGetChanelsApiQuery();
  const dispatch = useDispatch();
  const optionsModal = (type, toastMessage, idChanel = '', initialValue = '') => {
    dispatch(openModal({
      isShow: true,
      type,
      idChanel,
      initialValue,
      toastMessage,
    }));
  };

  if (error) {
    return <div>{t('chatHome.error')}</div>;
  }
  return (
    <>
      <ChanelHeader handleModal={optionsModal} />
      {isLoading ? (
        <h1>{t('chatHome.loading')}</h1>
      ) : (
        <Nav
          as='ul'
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

import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCredentials } from '../../../slices/authUserSlice';
import ChanelPanel from './chanelPanel/chanelPanel';
import ChatPanel from './chatPanel/chatPanel';
import CustomModal from '../../modal/modal';

import { Col, Container, Row } from 'react-bootstrap';

const ChatHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const modalIsShow = useSelector((state) => state.modal.isShow);
  useEffect(() => {
    const authorizationTokenLocalStorage = JSON.parse(
      window.localStorage.getItem('auth')
    );
    if (!authorizationTokenLocalStorage && !token) {
      navigate('/login');
    } else if (authorizationTokenLocalStorage && !token) {
      dispatch(setCredentials(authorizationTokenLocalStorage));
    }
  }, [navigate, dispatch, token]);

  return (
    <div className="heig-100">
      {modalIsShow && <CustomModal optionsModal={modalIsShow} />}
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChanelPanel />
          </Col>
          <Col className="p-0 h-100">
            <ChatPanel />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatHome;

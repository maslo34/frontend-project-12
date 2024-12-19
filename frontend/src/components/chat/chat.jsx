import { useGetMessageApiQuery } from '../../slices/newMessagesSlice.js';

import FormSendMessage from '../formSendMessage/formSendMessage.jsx';

import './chat.css';

const Chat = ({ activeChenel }) => {
  const { data, error, isLoading} = useGetMessageApiQuery()
  // console.log(data, error, isLoading, refetch, status)
  console.log(data)
  if (error) {
    return <></>
  }
  return (
    <div className='chat-conteiner'>
      <div className='chat-list'>
        <ul>
          {isLoading? <h1>Loading</h1>: data.filter((el) => el.channelId === activeChenel).map((el) => (<li key={el.id}>{el.body}</li>))}
        </ul>
      </div>
      <div className='chat-send-form'>
        <FormSendMessage channelId={activeChenel} />
      </div>
    </div>
  );
};

export default Chat;

import { useSelector } from 'react-redux';
import { selectors } from '../../slices/messageSlice.js';

import { useGetMessageApiQuery } from '../../slices/newMessagesSlice.js';

import FormSendMessage from '../formSendMessage/formSendMessage.jsx';

const Chat = ({ activeChenel }) => {
  const { data, error, isLoading, refetch, status } = useGetMessageApiQuery()
  console.log(data, error, isLoading, refetch, status)
  
  const messages = useSelector(selectors.selectAll);
  console.log(messages);
  return (
    <div>
      <div>
        <ul>
          {isLoading? <h1>Loading</h1>: data.filter((el) => el.channelId === activeChenel).map((el) => (<li key={el.id}>{el.body}</li>))}
        </ul>
      </div>
      <div>
        <FormSendMessage channelId={activeChenel} />
      </div>
    </div>
  );
};

export default Chat;

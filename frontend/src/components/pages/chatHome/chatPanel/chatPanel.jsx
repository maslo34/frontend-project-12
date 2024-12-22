import { useSelector } from 'react-redux';

import { useGetMessageApiQuery } from '../../../../slices/newMessagesSlice.js';

import FormSendMessage from '../formSendMessage/formSendMessage.jsx';
import ChatMessages from '../chatMessages/chatMessages.jsx';
import ChatPanelHeader from '../chatPanelHeader/ChatPanelHeader.jsx';

const ChatPanel = () => {
  const { chanelId, name } = useSelector((state) => state.actualChanelId);
  const { data, error, isLoading } = useGetMessageApiQuery();

  if (error) {
    return <></>;
  }
  return (
    <>
      <div className="d-flex flex-column h-100">
        {!isLoading && (
          <ChatPanelHeader
            data={data}
            currentName={name}
            currentId={chanelId}
          />
        )}
        <ChatMessages
          chanelId={chanelId}
          data={data}
          error={error}
          isLoading={isLoading}
        />
        <div className="mt-auto px-5 py-3">
          <FormSendMessage channelId={chanelId} />
        </div>
      </div>
    </>
  );
};

export default ChatPanel;

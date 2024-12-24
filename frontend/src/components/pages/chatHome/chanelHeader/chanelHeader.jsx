import { Button } from 'react-bootstrap';

import { t } from 'i18next';

import IconPlus from './iconPlus.png';

const ChanelHeader = ({ handleModal }) => {
  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('chatHome.chanel')}</b>
      <Button
        className="p-0 text-primary btn btn-group-vertical"
        onClick={() => handleModal('addChanel', t('toastMessage.add'))}
        variant="Light"
        size="sm"
      >
        <img src={IconPlus} height={'30'} />
        <span className="visually-hidden">+</span>
      </Button>
    </div>
  );
};

export default ChanelHeader;

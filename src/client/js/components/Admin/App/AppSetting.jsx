import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import loggerFactory from '@alias/logger';

import { createSubscribedElement } from '../../UnstatedUtils';
import { toastSuccess, toastError } from '../../../util/apiNotification';

import AppContainer from '../../../services/AppContainer';
import AdminAppContainer from '../../../services/AdminAppContainer';
import AdminUpdateButtonRow from '../Common/AdminUpdateButtonRow';

const logger = loggerFactory('growi:appSettings');

class AppSetting extends React.Component {

  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
  }

  async submitHandler() {
    const { t, adminAppContainer } = this.props;

    try {
      await adminAppContainer.updateAppSettingHandler();
      toastSuccess(t('toaster.update_successed', { target: t('App Settings') }));
    }
    catch (err) {
      toastError(err);
      logger.error(err);
    }
  }

  render() {
    const { t, adminAppContainer } = this.props;

    return (
      <React.Fragment>
        <div className="row form-group mb-5">
          <label className="col-3 col-form-label">{t('admin:app_setting.site_name')}</label>
          <div className="col-6">
            <input
              className="form-control"
              type="text"
              defaultValue={adminAppContainer.state.title || ''}
              onChange={(e) => { adminAppContainer.changeTitle(e.target.value) }}
              placeholder="GROWI"
            />
            <p className="form-text text-muted">{t('admin:app_setting.sitename_change')}</p>
          </div>
        </div>

        <div className="row form-group mb-5">
          <label className="col-3 col-form-label">{t('admin:app_setting.confidential_name')}</label>
          <div className="col-6">
            <input
              className="form-control"
              type="text"
              defaultValue={adminAppContainer.state.confidential || ''}
              onChange={(e) => { adminAppContainer.changeConfidential(e.target.value) }}
              placeholder={t('admin:app_setting.confidential_example')}
            />
            <p className="form-text text-muted">{t('admin:app_setting.header_content')}</p>
          </div>
        </div>

        <div className="row form-group mb-5">
          <label className="col-3 col-form-label">{t('admin:app_setting.default_language')}</label>
          <div className="col-6">
            <div className="custom-control custom-radio d-inline">
              <input
                type="radio"
                id="radioLangEn"
                className="custom-control-input"
                name="globalLang"
                value="en-US"
                checked={adminAppContainer.state.globalLang === 'en-US'}
                onChange={(e) => { adminAppContainer.changeGlobalLang(e.target.value) }}
              />
              <label className="custom-control-label" htmlFor="radioLangEn">{t('English')}</label>
            </div>
            <div className="custom-control custom-radio d-inline">
              <input
                type="radio"
                id="radioLangJa"
                className="custom-control-input"
                name="globalLang"
                value="ja"
                checked={adminAppContainer.state.globalLang === 'ja'}
                onChange={(e) => { adminAppContainer.changeGlobalLang(e.target.value) }}
              />
              <label className="custom-control-label" htmlFor="radioLangJa">{t('Japanese')}</label>
            </div>
          </div>
        </div>

        <div className="row form-group mb-5">
          <label className="col-3 col-form-label">{t('admin:app_setting.file_uploading')}</label>
          <div className="col-6">
            <div className="custom-control custom-checkbox custom-checkbox-info">
              <input
                type="checkbox"
                id="cbFileUpload"
                className="custom-control-input"
                name="fileUpload"
                checked={adminAppContainer.state.fileUpload}
                onChange={(e) => { adminAppContainer.changeFileUpload(e.target.checked) }}
              />
              <label className="custom-control-label" htmlFor="cbFileUpload">{t('admin:app_setting.enable_files_except_image')}</label>
            </div>

            <p className="form-text text-muted">
              {t('admin:app_setting.enable_files_except_image')}
              <br />
              {t('admin:app_setting.attach_enable')}
            </p>
          </div>
        </div>

        <AdminUpdateButtonRow onClick={this.submitHandler} disabled={adminAppContainer.state.retrieveError != null} />
      </React.Fragment>
    );
  }

}

/**
 * Wrapper component for using unstated
 */
const AppSettingWrapper = (props) => {
  return createSubscribedElement(AppSetting, props, [AppContainer, AdminAppContainer]);
};

AppSetting.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  adminAppContainer: PropTypes.instanceOf(AdminAppContainer).isRequired,
};

export default withTranslation()(AppSettingWrapper);

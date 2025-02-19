// @flow
import { compose } from 'redux';
import { connect } from 'react-redux';
import prepare from 'app/utils/prepare';
import { push } from 'connected-react-router';
import {
  fetchJoblisting,
  editJoblisting,
  deleteJoblisting,
} from 'app/actions/JoblistingActions';
import { fetchCompanyContacts } from 'app/actions/CompanyActions';
import JoblistingEditor from 'app/routes/joblistings/components/JoblistingEditor';
import { selectJoblistingById } from 'app/reducers/joblistings';
import { formValueSelector } from 'redux-form';
import loadingIndicator from 'app/utils/loadingIndicator';
import { LoginPage } from 'app/components/LoginForm';
import replaceUnlessLoggedIn from 'app/utils/replaceUnlessLoggedIn';
import { yearValues, jobTypes } from './constants';

const mapStateToProps = (state, props) => {
  const { joblistingId } = props.match.params;
  const formSelector = formValueSelector('joblistingEditor');
  const company = formSelector(state, 'company');
  const joblisting = selectJoblistingById(state, { joblistingId }) || {};

  const initialCompany = joblisting.company
    ? {
        label: joblisting.company.name,
        value: joblisting.company.id,
      }
    : {};

  return {
    joblisting,
    initialValues: {
      ...joblisting,
      // see ./JoblistingCreateRoute.js for why the initialValue is like this.
      text: joblisting.text || '<p></p>',
      description: joblisting.description || '',
      company: initialCompany,
      fromYear: yearValues.find(({ value }) => value === joblisting.fromYear),
      toYear: yearValues.find(({ value }) => value === joblisting.toYear),
      jobType: jobTypes.find(({ value }) => value === joblisting.jobType),
      responsible: joblisting.responsible
        ? {
            label: joblisting.responsible.name,
            value: joblisting.responsible.id,
          }
        : { label: 'Ingen', value: null },
      workplaces: (joblisting.workplaces || []).map((workplace) => ({
        label: workplace.town,
        value: workplace.town,
      })),
    },
    joblistingId,
    isNew: false,
    company: company ? company : initialCompany,
  };
};

const mapDispatchToProps = {
  submitJoblisting: editJoblisting,
  deleteJoblisting,
  fetchCompanyContacts,
  push,
};

export default compose(
  replaceUnlessLoggedIn(LoginPage),
  prepare(
    (
      {
        match: {
          params: { joblistingId },
        },
      },
      dispatch
    ) => dispatch(fetchJoblisting(joblistingId))
  ),

  connect(mapStateToProps, mapDispatchToProps),
  loadingIndicator(['company.value'])
)(JoblistingEditor);

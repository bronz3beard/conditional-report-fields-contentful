// import React from 'react';
// import PropTypes from 'prop-types';
// import { render } from 'react-dom';
// import {
//   SectionHeading,
//   TextInput,
//   FieldGroup,
//   RadioButtonField,
//   // Form,
//   // Asset,
//   // DropdownList
// } from '@contentful/forma-36-react-components';
// import { init, /*locations*/ } from 'contentful-ui-extensions-sdk';
// import '@contentful/forma-36-react-components/dist/styles.css';
// import '@contentful/forma-36-fcss/dist/styles.css';
// import './index.css';

// /**
//  * To use this demo create a Content Type with the following fields:
//  *  title: Short text
//  *  body: Long text
//  *  hasReport: Boolean
//  *  report: Long text
//  *
//  *  See https://github.com/contentful/create-contentful-extension/blob/master/docs/examples/entry-editor-content-model.json for details.
//  */

// export class App extends React.Component {
//   static propTypes = {
//     sdk: PropTypes.object.isRequired
//   };
//   detachExternalChangeHandler = null;
//   constructor(props) {
//     super(props);

//     this.state = {
//       hasReport: props.sdk.entry.fields.hasReport.getValue() || false,
//       reportUrl: props.sdk.entry.fields.reportUrl.getValue(),
//       // reportPdf: props.sdk.entry.fields.reportPdf.getValue(),
//     };
//   }
//   componentDidMount() {
//     this.props.sdk.window.startAutoResizer();
//     // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
//     this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
//   };
    
//   componentWillUnmount() {
//     if (this.detachExternalChangeHandler) {
//       this.detachExternalChangeHandler();
//     }
//   };

//   onHasReportChangeHandler = event => {
//     const hasReport = event.target.value === 'yes';
//     this.setState({ hasReport });
//     this.props.sdk.entry.fields.hasReport.setValue(hasReport);
//   };

//   onReportUrlChangeHandler = event => {
//     const value = event.target.value;
//     this.setState({ reportUrl: value });
//     this.props.sdk.entry.fields.reportUrl.setValue(value);
//   };

//   // onReportPdfChangeHandler = event => {
//   //   const value = event.target.value;
//   //   this.setState({ reportPdf: value });
//   //   this.props.sdk.entry.fields.reportPdf.setValue(value);
//   // };



//   render() {
//     const { hasReport, reportUrl, /*reportPdf*/ } = this.state;
//     return (
//       // <Form className="f36-margin--l">
//       <>
//         <SectionHeading>Is Report?</SectionHeading>
//         <FieldGroup row={false}>
//           <RadioButtonField
//             labelText="Yes"
//             checked={hasReport === true}
//             value="yes"
//             onChange={this.onHasReportChangeHandler}
//             name="reportOption"
//             id="yesCheckbox"
//           />
//           <RadioButtonField
//             labelText="No"
//             checked={hasReport === false}
//             value="no"
//             onChange={this.onHasReportChangeHandler}
//             name="reportOption"
//             id="noCheckbox"
//           />
//         </FieldGroup>
//         {hasReport && (
//           <>
//             <SectionHeading>report</SectionHeading>
//             <TextInput
//               testId="field-report"
//               onChange={this.onReportUrlChangeHandler}
//               value={reportUrl}
//             />
//             {/* <Asset /> */}
//           </>
//         )}          </>
//       // </Form>
//     );
//   }
// }

// // init(sdk => {
// //   if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
// //     render(<App sdk={sdk} />, document.getElementById('root'));
// //   }
// // });

// /**
//  * By default, iframe of the extension is fully reloaded on every save of a source file.
//  * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
//  */
// // if (module.hot) {
// //   module.hot.accept();
// // }

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { 
  SectionHeading,
  TextInput,
  FieldGroup,
  RadioButton,
  // Form,
  Asset,
  // DropdownList
 } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      // value: props.sdk.field.getValue() || '',
      hasReport: props.sdk.field.getValue() || false,
      reportUrl: props.sdk.field.getValue() || '',
      // reportPdf: props.sdk.entry.fields.reportPdf.getValue(),
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onHasReportChangeHandler = event => {
    const hasReport = event.currentTarget.value === 'yes';
    this.setState({ hasReport });
    this.props.sdk.field.setValue(hasReport);
  };

  // onReportUrlChangeHandler = event => {
  //   const value = event.currentTarget.value;
  //   this.setState({ reportUrl: value });
  //   this.props.sdk.field.reportUrl.setValue(value);
  // };

  onExternalChange = value => {
    this.setState({ reportUrl: value });
  };

  onReportUrlChangeHandler = event => {
    const value = event.currentTarget.value;
    this.setState({ reportUrl: value });
    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  render() {
    const { hasReport, reportUrl, /*reportPdf*/ } = this.state;
    return (
      <Fragment>
        <FieldGroup row={true}>
        <RadioButton
          labelText="Yes"
          checked={hasReport === true}
          value="yes"
          onChange={this.onHasReportChangeHandler}
          name="reportOption"
          id="yesCheckbox"
        />
        <RadioButton
          labelText="No"
          checked={hasReport === false}
          value="no"
          onChange={this.onHasReportChangeHandler}
          name="reportOption"
          id="noCheckbox"
        />
        </FieldGroup>
        {hasReport && (
          <Fragment>
            <SectionHeading>report Url</SectionHeading>
            <TextInput
              testId="field-report"
              onChange={this.onReportUrlChangeHandler}
              value={reportUrl}
            /> 
            <Asset />
          </Fragment>
          )}
      </Fragment>
    );
  }
}

init(sdk => {
  render(<App sdk={sdk} />, document.getElementById('root'));
});

// /**
//  * By default, iframe of the extension is fully reloaded on every save of a source file.
//  * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
//  */
// // if (module.hot) {
// //   module.hot.accept();
// // }

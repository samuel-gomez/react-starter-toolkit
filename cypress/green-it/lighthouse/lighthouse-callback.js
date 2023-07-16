/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const { minify } = require('html-minifier');

const createLighthouseReportsDirectories = (paths) => {
  if (!fs.existsSync(paths.reportsPath)) {
    fs.mkdirSync(paths.reportsPath, (err) => {
      if (err) {
        throw new Error('An error occurred while creating new directory reports');
      }
    });
  }

  if (!fs.existsSync(paths.lighthouseReportsPath)) {
    fs.mkdirSync(paths.lighthouseReportsPath, (err) => {
      if (err) {
        throw new Error('An error occurred while creating new directory lighthouse');
      }
    });
  }
};

const cleanLighthouseReportsFiles = (options, paths) => {
  if (fs.existsSync(`${paths.lighthouseReportsPath}${options.filename}.json`)) {
    fs.unlinkSync(`${paths.lighthouseReportsPath}${options.filename}.json`);
  }
  if (fs.existsSync(`${paths.lighthouseReportsPath}${options.filename}.html`)) {
    fs.unlinkSync(`${paths.lighthouseReportsPath}${options.filename}.html`);
  }
};

const writeLighthouseReportJsonFile = (options, paths, lighthouseReport) => {
  const reportContent = JSON.stringify(lighthouseReport.lhr, 0, 2);
  fs.writeFileSync(`${paths.lighthouseReportsPath}${options.filename}.json`, reportContent, { flag: 'a+' });
};

const writeLighthouseReportHtmlFile = (options, paths, lighthouseReport) => {
  const { reportOptions } = options;
  let reportContent = lighthouseReport.report;
  if (reportOptions && reportOptions.minifyHtmlReports) {
    reportContent = minify(reportContent, reportOptions.htmlMinifierOptions);
  }
  fs.writeFileSync(`${paths.lighthouseReportsPath}${options.filename}.html`, reportContent, {
    flag: 'a+',
  });
};

const lighthouseCallback = (options, paths) => (lighthouseReport) => {
  createLighthouseReportsDirectories(paths);
  cleanLighthouseReportsFiles(options, paths);
  writeLighthouseReportJsonFile(options, paths, lighthouseReport);
  writeLighthouseReportHtmlFile(options, paths, lighthouseReport);
  return lighthouseReport;
};

exports.lighthouseCallback = lighthouseCallback;

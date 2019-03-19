const ncp = require('ncp').ncp;
const path = require('path');
const npm = require('npm');
const Config = require('../config');
const StringTemplates = require('./StringTemplates');

const PROJECT_TEMPLATE_PATH = 'server/.templates/.project';

class ProjectHelper {

    static create(destination) {
        return new Promise(function(resolve, reject) {
            const source = path.resolve(PROJECT_TEMPLATE_PATH);

            ncp(source, destination, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static installDependencies(project) {
        // get npm and install dependencies inside project
        return new Promise((resolve, reject) => {
            const path = Config.getProjectPath(project);

            npm.load({}, function (err) {
                npm
                    .commands
                    .install(path, [], function(er, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                });
            });
        });
    }

    static updateIndexFile() {
        StringTemplates
            .buildInitScript()
            .then(script => {
                // write script in index file inside src
            });
    }

    static exists(name) {
        // check if project esists inside workspace
    }
}

module.exports = ProjectHelper;

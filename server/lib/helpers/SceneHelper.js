const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');
const Config = require('../config');

const SCENE_TEMPLATE_PATH = 'server/.templates/.scene';
const SCENES_PATH = 'src';
const DEFAULT_SCENE_NAME = 'BaseScene';

class SceneHelper {

    static create(destination, sceneName) {
        return new Promise(function(resolve, reject) {
            const source = path.resolve(SCENE_TEMPLATE_PATH);
            const final_destination = path.join(destination, SCENES_PATH);

            ncp(source, final_destination, function(err) {
                if (err) {
                    reject(err);
                } else {
                    SceneHelper.rename(final_destination, DEFAULT_SCENE_NAME, sceneName);
                    resolve();
                }
            });
        });
    }

    static rename(location, oldName, newName) {
        const oldPath = path.join(location, oldName);
        const newPath = path.join(location, newName);

        fs.renameSync(oldPath, newPath);
    }

    static updateSceneData(sceneName, data) {
        // copy scene.json inside the folder
        const filename = 'scene.json';

        const sceneJsonPath = path.join(
            Config.getScenePath(sceneName),
            filename
        );

        try {
            fs.writeFileSync(sceneJsonPath, data);
            return true;
        } catch(e) {
            return false;
        }
    }

    static readSceneData(sceneName) {
        if (SceneHelper.exists(sceneName)) {
            const sceneJsonPath = path.join(
                Config.getScenePath(sceneName),
                'scene.json'
            );

            try {
                const stringContent = fs.readFileSync(sceneJsonPath).toString('utf8');

                return JSON.parse(stringContent);
            } catch(e) {
                return {};
            }
        } else {
            return {};
        }
    }

    static getAllScenes() {
        const root = Config.getSceneRoot();

        const isDirectory = source => fs.lstatSync(source).isDirectory();
        const extractRoot = source => source.replace(`${root}/`, '');

        return fs.readdirSync(root)
                .map(name => path.join(root, name))
                .filter(isDirectory)
                .map(extractRoot)
    }

    static getConfig(sceneName) {
        // get index file inside scene folder
    }

    static updateConfig(sceneName, config) {
        // update config inside sceneName
    }

    static exists(sceneName) {
        // check if a folder called sceneName exists inside projectName
        return fs.existsSync(Config.getScenePath(sceneName));
    }
}

module.exports = SceneHelper;

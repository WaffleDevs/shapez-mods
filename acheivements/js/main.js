import { createLogger } from "shapez/core/logging";
import { TextualGameState } from "shapez/core/textual_game_state";
import { Mod } from "shapez/mods/mod";
import { SettingsState } from "shapez/states/settings";
import { T } from "shapez/translations";
import { BUILD_OPTIONS } from "shapez/core/globals";
import { makeDiv } from "shapez/core/utils";

const logger = createLogger('Achievement Library')

const G_CHINA_VERSION = BUILD_OPTIONS.CHINA_VERSION;
const G_WEGAME_VERSION = BUILD_OPTIONS.WEGAME_VERSION;


export const defaultAchievementIcon = "data:image/png;base64,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"
let completedAchievements;
let achievements = {}
let MENotices;

class AchievementsState extends TextualGameState {
    constructor() {
        super("AchievementsState");
    }

    getStateHeaderTitle() {
        return "Achievements";
    }
    
    // @ts-ignore
    internalGetFullHtml() {
        let headerHtml = `
            <div class="headerBar">
                <h1><button class="backButton"></button> ${this.getStateHeaderTitle()}</h1>
            </div>`;

        return `
            ${headerHtml}
            <div class="container">
                    ${this.getInnerHTML()}
            </div>
        `;
    }

    getMainContentHTML() {
        let achievs = achievements;

        if (achievs.length == 0) {
            return `
                <div class="achievStats noAchievements">
                    <p>You have 0 added achievements!</p>
                </div>
            `;
        }
        let achievHtml = ``;

        let test = Object.keys(achievements);
        test.sort();
        test.forEach((a) => {
            let achiev = achievements[a]
            if(achiev.completed) {
                achievHtml += `
                    <div class="achiev ${achiev.completed ? "completed" : "incomplete"}">
                        <span class="achievementIcon" style="background-image: url('${achiev.icon}');"></span>
                        <div class="mainInfo">
                            <span class="name">${achiev.name}</span>
                            <span class="description">${achiev.description}</span>
                        </div>
                        <span class="achievModName">Mod: ${achiev.authorMod}</span>
                    </div>
                `;
            }
        })
        
        test.forEach((a) => {
            let achiev = achievements[a]
            if(!achiev.completed) {
                achievHtml += `
                    <div class="achiev ${achiev.completed ? "completed" : "incomplete"}">
                        <span class="achievementIcon"><img src="${achiev.icon}"></span>
                        <div class="mainInfo">
                            <span class="name">${achiev.name}</span>
                            <span class="description">${achiev.description}</span>
                        </div>
                        <span class="achievModName">Mod: ${achiev.authorMod}</span>
                    </div>
                `;
            }
        })

        return `
            <div class="achievList">
                ${achievHtml}
           </div>
        `;
    }

    getDefaultPreviousState() {
        return "MainMenuState";
    }
}
class AchievementLibMod extends Mod {
    
    init() {
        this.checkSettings();

        this.signals.appBooted.add(() => {
            this.app.stateMgr.register(AchievementsState);
            // @ts-ignore
            // MENotices = ModExtras.require("dengr1065:mod_extras").api.notices.Notice;
        });
        
        this.signals.stateEntered.add(state => {
            if(state.key === "MainMenuState") {
                for(let achiev in achievements){
                    if(this.settings.completedAchievements.includes(achiev)) {
                        achievements[achiev].completed = true;
                        logger.log(`Completed Achievement ${achiev} loaded.`)
                    }
                };
            }
        })
 
        logger.log('init')

        this.modInterface.replaceMethod( SettingsState, "getMainContentHTML",  function () {
            return `

                <div class="sidebar">
                    ${this.getCategoryButtonsHtml()}



                    ${
                        this.app.platformWrapper.getSupportsKeyboard()
                            ? `
                    <button class="styledButton categoryButton editKeybindings">
                    ${T.keybindings.title}
                    </button>`
                            : ""
                    }
                    <button class="styledButton categoryButton manageMods">${T.mods.title}
                        <span class="newBadge">${T.settings.newBadge}</span>
                    </button>

                        <button class="styledButton categoryButton viewAchievements">Achievements</button>


                    <div class="other">

                    ${
                        G_CHINA_VERSION || G_WEGAME_VERSION
                            ? ""
                            : `
                        <button class="styledButton about">${T.about.title}</button>
                        <button class="styledButton privacy">Privacy Policy</button>

        `
                    }
                        <div class="versionbar">
                            ${G_WEGAME_VERSION ? "" : `<div class="buildVersion">${T.global.loading} ...</div>`}
                        </div>
                    </div>
                </div>

                <div class="categoryContainer">
                    ${this.getSettingsHtml()}
                </div>

            `;
        })

        this.modInterface.replaceMethod( SettingsState, "onEnter",  function ($old, [ payload ]) {
            this.renderBuildText();

            if (!G_CHINA_VERSION && !G_WEGAME_VERSION) {
                this.trackClicks(this.htmlElement.querySelector(".about"), this.onAboutClicked, {
                    preventDefault: false,
                });
                this.trackClicks(this.htmlElement.querySelector(".privacy"), this.onPrivacyClicked, {
                    preventDefault: false,
                });
            }

            const keybindingsButton = this.htmlElement.querySelector(".editKeybindings");

            if (keybindingsButton) {
                this.trackClicks(keybindingsButton, this.onKeybindingsClicked, { preventDefault: false });
            }

            this.initSettings();
            this.initCategoryButtons();

            this.htmlElement.querySelector(".category").classList.add("active");
            this.htmlElement.querySelector(".categoryButton").classList.add("active");

            const modsButton = this.htmlElement.querySelector(".manageMods");
            const achievementButton = this.htmlElement.querySelector(".viewAchievements");
            if (modsButton) {
                this.trackClicks(modsButton, this.onModsClicked, { preventDefault: false });
            }

            let a = this;
            if (achievementButton) {
                achievementButton.addEventListener('click', () => {a.moveToStateAddGoBack("AchievementsState")} , false);
            }
        })
    }
    
    checkSettings() {
        // Create default settings if corrupted
        if (!this.settings) {
            this.settings = {};
        }
        if (!this.settings.completedAchievements) {
            this.settings.completedAchievements = [];
        }
        this.saveSettings();
    }
    completedAchievement(achievement) {
        if(!this.settings.completedAchievements.includes(achievement)) this.settings.completedAchievements.push(achievement);
        this.saveSettings()
        logger.log(`Completed achievement ${achievement}`)
        achievements[achievement].completed = true;
        this.app.sound.playUiSound('level_complete')
    
        const element = makeDiv(document.documentElement,"noticesDiv", ["noticesDiv"])


        // const notice = new MENotices(undefined, ["notice"]);
        // notice.textHTML = `${achievements[achievement].name}`;
        // notice.title = "Achievement Unlocked";
        // notice.icon = `${achievements[achievement].icon}`//"warning";
        // notice.color = "#888"; // not all colors are there yet
        // // notice.type = "info" // don't use this yet, you'll get unexpected results

        // notice.show(element);
        // setTimeout(() => {
        //     notice.element.remove()
        // },5000)
    }
    getAchievementStatus(achievement) {
        if(completedAchievements) return completedAchievements.includes(achievement);
        else return false;
    }

    addAchievement(achievement) {
        logger.log(`Registered achievement ${achievement.id}`)
        achievements[achievement.id] = achievement;
        achievements[achievement.id].completed = false;
    }
}

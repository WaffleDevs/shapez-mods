import { DialogWithForm } from "shapez/core/modal_dialog_elements";
import { Mod } from "shapez/mods/mod";
import { MODS } from "shapez/mods/modloader";
import { MainMenuState } from "shapez/states/main_menu";
import { defaultAchievementIcon } from "../../acheivements/js/main"

const newBeginningsAchievement = {
    name: "New Beginnings...",
    description: "Start a new game.",
    authorMod: "Achievements Example Mod",
    id: "new-beginnings",
    icon: defaultAchievementIcon,
    //icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMtJREFUWEftltsNgCAMRcs+7j+J+2BMRAH7BoIx+N/25PSmGGDyFybPhwXwHQMRIHJ5CECvi6vl6s55t4HfAuRWMRvDDagB6v3XK/FmwA1gOVBSflIvdgWWgZItqpcKwKK+BTqz8rTBVGLUO8TiZmwQ3AetKFwAowxwuXKtwBq+JoDrwXCHTLL6akwdFelVo6x0A+CumWV4bRRVqzmtkhHtPwK5Ww2ENYxYnthwjYCozanS3QOEWpkKIKn2gnB5MQF4di7VLIBlYLqBA3UkTCF1yL3zAAAAAElFTkSuQmCC",
    completed: false
}

let achievementsLib;

class ExampleMod extends Mod {
    init() {
        this.signals.appBooted.add(() => {
            achievementsLib = MODS.mods.find(mod => mod.metadata.id == "achievements-lib");
            if(!achievementsLib) {
                this.signals.stateEntered.add(state => {
                    if(state.key === "MainMenuState") {
                        const dialog = new DialogWithForm({
                            app: this.app,
                            title: 'Missing Dependency.',
                            formElements: [],
                            desc: 'The mod "Achievments Example Mod" requries verison >1.0.0 of <a href="https://shapez.mod.io/achievement-lib">AchievementsLib</a>.',
                            buttons: ['ok:bad:enter'],
                            closeButton: false
                        })

                        this.dialogs.internalShowDialog(dialog);
                    }
                })
                
            }
            //@ts-ignore
            achievementsLib.addAchievement(newBeginningsAchievement)
        });


        this.modInterface.runAfterMethod(MainMenuState, "onPlayButtonClicked", function () {
            //@ts-ignore
            achievementsLib.completedAchievement('new-beginnings')
        });

       
    }
}



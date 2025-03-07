import { DependencyContainer } from "tsyringe";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IItem } from "@spt/models/eft/common/tables/IItem";

class Mod implements IPreSptLoadMod {
    public preSptLoad(container: DependencyContainer): void {
        container.afterResolution("InRaidHelper", (_t, result: InRaidHelper) => {
            result.removeFiRStatusFromCertainItems = (items: IItem): void {
                return this.InRaidHelperReplacement(items);
            }
        }, { frequency: "Always" })
    }

    private InRaidHelperReplacement(items: IItem): void {
        for (const item of items) {
            if ("upd" in item) {
                item.upd.SpawnedInSession = true
            } else {
                item.upd = { SpawnedInSession: true }
            }
        }
    }
}
module.exports = { mod: new Mod() }
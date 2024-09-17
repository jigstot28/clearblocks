
/**
* An extension to clear blocks in a flat space
* using 2 points (point A and point B)
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Clear blocks
 */
//% weight=100 color=#CB8DA4 icon="\uf12d"
namespace Clear {
    /**
     * Select an area to clear by setting position A and B using a Stick
     */
    //% block = "set position A and B to clear"
    //% block.shadow=minecraftBlock
    export function ClearBlocks(): void {
        player.onItemInteracted(STICK, function on_item_interacted_stick() {
            if (!pos_b_done && pos_a_done) {
                pos_b = pos(0, 0, 0)
                pos_b_done = true
                // player.say("Position B: " + pos_b)
                return
            }

            if (!pos_a_done) {
                pos_a = positions.groundPosition(pos(0, 0, 0))
                pos_a_done = true
                player.say("Position A: " + pos_a)
                WaitClear()
            }
        })
    }

    function WaitClear(): void {
        loops.forever(function on_forever() {
            if (pos_a_done) {
                // player.say("Waiting...")
                gameplay.title(mobs.target(NEAREST_PLAYER), "Waiting to set Position B", "")
                builder.teleportTo(pos_a)
                builder.mark()
                if (pos_b_done) {
                    builder.teleportTo(player.position())
                    for (let i = 0; i < 10; i++) {
                        builder.move(UP, 5)
                        builder.fill(AIR)
                    }
                    gameplay.title(mobs.target(NEAREST_PLAYER), "Blocks cleared!", "")
                    pos_a = null
                    pos_a_done = false
                    pos_b_done = false
                    return
                }
            }
            return
        })
    }

    /**
     * Waits and clears the selected area
     */
    //% block = "clear blocks within the set A and B positions"
    //% block.shadow=minecraftBlock

    let pos_b_done = false
    let pos_a_done = false
    let pos_b: Position = null
    let pos_a: Position = null
    pos_a = pos(0, 0, 0)
    pos_b = pos(0, 0, 0)
}
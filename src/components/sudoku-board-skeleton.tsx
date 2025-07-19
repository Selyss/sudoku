export function SudokuBoardSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-[2px] bg-neutral-700 p-[2px]">
      {[0, 1, 2].map((boxRow) => (
        <div key={boxRow} className="col-span-3 grid grid-cols-3 gap-[2px]">
          {[0, 1, 2].map((boxCol) => (
            <div key={`${boxRow}-${boxCol}`} className="grid grid-cols-3 gap-[1px] bg-neutral-800">
              {[0, 1, 2].map((cellRow) => (
                [0, 1, 2].map((cellCol) => {
                  const row = boxRow * 3 + cellRow
                  const col = boxCol * 3 + cellCol
                  return (
                    <div key={`${row}-${col}`} className="bg-background aspect-square">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-neutral-300 dark:bg-neutral-600 rounded animate-pulse" />
                      </div>
                    </div>
                  )
                })
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

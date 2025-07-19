import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export function DifficultySelector({ difficulty, onDifficultyChange }: DifficultySelectorProps) {
  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium', 
    hard: 'Hard'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[100px]">
          {difficultyLabels[difficulty]}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onDifficultyChange('easy')}>
          Easy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDifficultyChange('medium')}>
          Medium
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDifficultyChange('hard')}>
          Hard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

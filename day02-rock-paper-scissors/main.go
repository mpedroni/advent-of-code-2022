package main

/**
Opponent
	A = Rock
	B = Paper
	C = Scissors

I
	X = Rock
	Y = Paper
	Z = Scissors

Points
	1 = Rock
	2 = Paper
	3 = Scissors

	0 = Lose
	3 = Draw
	6 = Win

- get my points for a given game
- Rock > Scissors, Scissors > Paper, Paper > Rock
- A Y (8)
  B X (1)
  C Z (6)
  -> score of 15
**/

/* part two:

- X > need to lose
- Y > need to end in a draw
- Z > need to win
*/

import (
	"fmt"
	"os"
	"strings"
)

func GetShapePoints(shape Shape) int {
	if shape == Rock {
		return 1
	}
	if shape == Paper {
		return 2
	}
	if shape == Scissors {
		return 3
	}

	panic("Unknown shape")
}

func GetMatchPoints(opponent, me Shape) int {
	LoosePoints := 0
	DrawPoints := 3
	WinPoints := 6

	if opponent == Rock {
		if me == Paper {
			return WinPoints
		}

		if me == Scissors {
			return LoosePoints
		}
	}

	if opponent == Paper {
		if me == Rock {
			return LoosePoints
		}

		if me == Scissors {
			return WinPoints
		}
	}

	if opponent == Scissors {
		if me == Rock {
			return WinPoints
		}

		if me == Paper {
			return LoosePoints
		}
	}

	return DrawPoints
}

func GetPoints(opponent, me Shape) int {
	points := GetMatchPoints(opponent, me) + GetShapePoints(me)

	return points
}

func GetShapeLosesFrom(shape Shape) Shape {
	if shape == Rock {
		return Scissors
	}

	if shape == Paper {
		return Rock
	}

	if shape == Scissors {
		return Paper
	}

	panic("")
}

func GetShapeBeats(shape Shape) Shape {
	if shape == Rock {
		return Paper
	}

	if shape == Paper {
		return Scissors
	}

	if shape == Scissors {
		return Rock
	}

	panic("")
}

type Shape int

const (
	Rock     Shape = 1
	Paper    Shape = 2
	Scissors Shape = 3
)

func main() {
	opponent := make(map[string]Shape)
	me := make(map[string]Shape)

	opponent["A"] = Rock
	opponent["B"] = Paper
	opponent["C"] = Scissors

	me["X"] = Rock
	me["Y"] = Paper
	me["Z"] = Scissors

	file, err := os.ReadFile("input.txt")
	if err != nil {
		panic("error when open input file")
	}

	input := string(file)
	var matches [][]string

	for _, match := range strings.Split(input, "\n") {
		matches = append(matches, strings.Split(match, " "))
	}

	points := 0
	for _, match := range matches {
		opponentCode, myCode := match[0], match[1]

		points += GetPoints(opponent[opponentCode], me[myCode])
	}

	fmt.Println("[part one] points", points)

	points = 0
	for _, match := range matches {
		opponentCode, myCode := match[0], match[1]

		if myCode == "X" { // need to lose
			points += GetPoints(opponent[opponentCode], GetShapeLosesFrom(opponent[opponentCode]))
		}

		if myCode == "Y" { // need to draw
			points += GetPoints(opponent[opponentCode], opponent[opponentCode])
		}

		if myCode == "Z" { // need to win
			points += GetPoints(opponent[opponentCode], GetShapeBeats(opponent[opponentCode]))
		}
	}

	fmt.Println("[part two] points", points)
}

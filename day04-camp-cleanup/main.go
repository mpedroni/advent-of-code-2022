package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type ElfPair []string
type Section []int

func ParseInputFile(filename string) []ElfPair {
	file, err := os.ReadFile(filename)
	if err != nil {
		panic("error when opening input file")
	}

	input := string(file)
	elves := make([]ElfPair, 0)

	for _, pair := range strings.Split(input, "\n") {
		elves = append(elves, strings.Split(pair, ","))
	}

	return elves
}

func GetElfPairSectionsToClear(pair ElfPair) []Section {
	elves := make([]Section, 0)

	for _, elf := range pair {
		sections := strings.Split(elf, "-")
		from, _ := strconv.Atoi(sections[0])
		to, _ := strconv.Atoi(sections[1])

		elves = append(elves, []int{from, to})
	}

	return elves
}

func IsElfSectionsOverlapped(first, second Section) bool {
	oneStartAfterOtherEnd := first[1] < second[0] || second[1] < first[0]

	if oneStartAfterOtherEnd {
		return false
	}

	isOverlapped := first[0] <= second[0] && first[1] >= second[1] ||
		second[0] <= first[0] && second[1] >= first[1]

	return isOverlapped
}

func main() {
	elves := ParseInputFile("input_prod.txt")

	overlapped := 0
	for _, pair := range elves {
		sections := GetElfPairSectionsToClear(pair)
		isOverlapped := IsElfSectionsOverlapped(sections[0], sections[1])
		if isOverlapped {
			overlapped = overlapped + 1
		}
	}

	fmt.Println("overlapped", overlapped)
}

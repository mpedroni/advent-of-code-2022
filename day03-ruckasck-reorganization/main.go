package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

/*
- vJrwpWtwJgWrhcsFMMfFFhFp -> vJrwpWtwJgWr hcsFMMfFFhFp -> p (16)
- each input line is a rucksack items; half parts represents each compartments
- get repeated items in both halfs
- get duplicated item priority (ASCII maybe)
- sum that priorities
*/

type Rucksack = string
type Compartments = []string

func ParseInputFile(filename string) []Rucksack {
	file, err := os.ReadFile(filename)
	if err != nil {
		panic("error when opening input file")
	}

	input := string(file)
	rucksacks := make([]Rucksack, 0)

	rucksacks = append(rucksacks, strings.Split(input, "\n")...)

	return rucksacks
}

func GetIntersectionPriorities(intersection []string) int {
	if len(intersection) == 0 {
		return 0
	}

	isLowerCase, _ := regexp.MatchString(`[a-z]`, intersection[0])
	priority := []rune(intersection[0])[0]

	// item -> priority -> ASCII code
	//
	// a -> 1 -> 97
	// z -> 26 -> 122
	// - 96

	// A -> 27 -> 65
	// Z -> 52 -> 90
	// - 38

	if isLowerCase {
		priority = priority - 96
	} else {
		priority = priority - 38
	}

	return int(priority)
}

func GetCompartmentsIntersections(compartments Compartments) []string {
	intersections := make(map[string]bool, 0)
	items := make(map[string]int)

	for _, item := range compartments[0] {
		items[string(item)] = 1
	}

	for _, item := range compartments[1] {
		if _, ok := items[string(item)]; ok {
			intersections[string(item)] = true
		}
	}

	set := make([]string, 0)

	for item := range intersections {
		set = append(set, item)
	}

	return set
}

func GetRucksackCompartments(rucksack Rucksack) Compartments {
	compartments := Compartments{rucksack[:len(rucksack)/2], rucksack[len(rucksack)/2:]}

	return compartments
}

func GetRucksackIntersections(rucksacks []Rucksack) []string {
	intersections := make(map[string]bool, 0)
	items := make(map[string]int)

	for n, rucksack := range rucksacks {
		for _, item := range rucksack {
			if lastN, ok := items[string(item)]; ok && lastN == n-1 || n == lastN {
				items[string(item)] = n
			} else if n == 0 {
				items[string(item)] = 0
			}

			if i, ok := items[string(item)]; ok && i == len(rucksacks)-1 {
				intersections[string(item)] = true
			}
		}
	}

	set := make([]string, 0)

	for item := range intersections {
		set = append(set, item)
	}

	return set
}

func main() {
	rucksacks := ParseInputFile("input_prod.txt")
	intersections := make([]Compartments, len(rucksacks))

	for _, rucksack := range rucksacks {
		compartments := GetRucksackCompartments(rucksack)
		intersection := GetCompartmentsIntersections(compartments)
		intersections = append(intersections, intersection)
	}

	// part one
	sum := 0
	for _, intersection := range intersections {
		priority := GetIntersectionPriorities(intersection)
		sum = sum + priority
	}

	fmt.Println("part one ->", sum)

	// part two
	sum = 0
	for group := 0; group < len(rucksacks)/3; group = group + 1 {
		from := group * 3
		to := from + 3
		if to > len(rucksacks) {
			to = to % len(rucksacks)
		}
		rucksackGroup := rucksacks[from:to]
		intersections := GetRucksackIntersections(rucksackGroup)
		sum = sum + GetIntersectionPriorities(intersections)
	}

	fmt.Println("part two ->", sum)
}

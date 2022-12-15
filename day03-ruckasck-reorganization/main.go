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

type Rucksack = []string

func ParseInputFile(filename string) []Rucksack {
	file, err := os.ReadFile(filename)
	if err != nil {
		panic("error when opening input file")
	}

	input := string(file)
	rucksacks := make([]Rucksack, 0)

	for _, rucksack := range strings.Split(input, "\n") {
		compartments := Rucksack{rucksack[:len(rucksack)/2], rucksack[len(rucksack)/2:]}
		rucksacks = append(rucksacks, compartments)
	}

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

func GetRucksackIntersections(rucksack Rucksack) []string {
	intersections := make(map[string]bool, 0)
	items := make(map[string]int)

	for _, item := range rucksack[0] {
		items[string(item)] = 1
	}

	for _, item := range rucksack[1] {
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

func main() {
	rucksacks := ParseInputFile("input_prod.txt")
	intersections := make([]Rucksack, len(rucksacks))

	for _, rucksack := range rucksacks {
		intersection := GetRucksackIntersections(rucksack)
		intersections = append(intersections, intersection)
	}

	sum := 0
	for _, intersection := range intersections {
		priority := GetIntersectionPriorities(intersection)
		sum = sum + priority
	}

	fmt.Println("sum ->", sum)
}

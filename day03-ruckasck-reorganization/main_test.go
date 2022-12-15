package main

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestParsingFile(t *testing.T) {
	rucksacks := ParseInputFile("input_test.txt")

	expect := []Rucksack{{"vJrwpWtwJgWr", "hcsFMMfFFhFp"}, {"jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL"}, {"PmmdzqPrV", "vPwwTWBwg"}, {"wMqvLMZHhHMvwLH", "jbvcjnnSBnvTQFn"}, {"ttgJtRGJ", "QctTZtZT"}, {"CrZsJsPPZsGz", "wwsLwLmpwMDw"}}

	require.EqualValues(t, expect, rucksacks)
}

func TestFindIntersectionBetweenBothRucksackCompartments(t *testing.T) {
	rucksack := Rucksack{"vJrwpWtwJgWr", "hcsFMMfFFhFp"}
	expected := []string{"p"}

	intersections := GetRucksackIntersections(rucksack)

	require.EqualValues(t, expected, intersections)
}

func TestGetIntersectionsPriorities(t *testing.T) {
	rucksack := []Rucksack{{"vJrwpWtwJgWr", "hcsFMMfFFhFp"}, {"jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL"}}

	intersections := [][]string{GetRucksackIntersections(rucksack[0]), GetRucksackIntersections(rucksack[1])}

	priorities := []int{GetIntersectionPriorities(intersections[0]), GetIntersectionPriorities(intersections[1])}

	require.EqualValues(t, 16, priorities[0])
	require.EqualValues(t, 38, priorities[1])
}

package main

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestParsingFile(t *testing.T) {
	rucksacks := ParseInputFile("input_test.txt")

	expect := []Rucksack{"vJrwpWtwJgWrhcsFMMfFFhFp", "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", "PmmdzqPrVvPwwTWBwg", "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn", "ttgJtRGJQctTZtZT", "CrZsJsPPZsGzwwsLwLmpwMDw"}

	require.EqualValues(t, expect, rucksacks)
}

func TestGetRucksackCompartments(t *testing.T) {
	rucksack := "vJrwpWtwJgWrhcsFMMfFFhFp"
	expected := Compartments{"vJrwpWtwJgWr", "hcsFMMfFFhFp"}

	compartments := GetRucksackCompartments(rucksack)

	require.EqualValues(t, expected, compartments)
}

func TestFindIntersectionBetweenCompartments(t *testing.T) {
	compartments := Compartments{"vJrwpWtwJgWr", "hcsFMMfFFhFp"}
	expected := []string{"p"}

	intersections := GetCompartmentsIntersections(compartments)

	require.EqualValues(t, expected, intersections)
}

func TestFindIntersectionsBetweenRucksacks(t *testing.T) {
	rucksacks := []Rucksack{"vJrwpWtwJgWrhcsFMMfFFhFp", "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", "PmmdzqPrVvPwwTWBwg"}
	expected := []string{"r"}

	badges := GetRucksackIntersections(rucksacks)

	require.EqualValues(t, expected, badges)
}

func TestGetIntersectionsPriorities(t *testing.T) {
	compartments := []Compartments{{"vJrwpWtwJgWr", "hcsFMMfFFhFp"}, {"jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL"}}

	intersections := [][]string{GetCompartmentsIntersections(compartments[0]), GetCompartmentsIntersections(compartments[1])}

	priorities := []int{GetIntersectionPriorities(intersections[0]), GetIntersectionPriorities(intersections[1])}

	require.EqualValues(t, 16, priorities[0])
	require.EqualValues(t, 38, priorities[1])
}

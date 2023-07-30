package main

type team struct {
	ID      string   `json:"id"`
	Name    string   `json:"title"`
	Players []player `json:"players"`
}

var teams = []team{
	{ID: "1", Name: "Mosman", Players: players},
}

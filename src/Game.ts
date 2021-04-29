type Symbol = "X" | "O" | " "

export class Game {
    private _lastSymbol: Symbol = ' ';
    private _board: Board = new Board(3);

    public Play(symbol: Symbol, x: number, y: number) : void {
        this.ValidateMove(symbol);

        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, {X: x, Y: y});
    }

    public Winner() : Symbol {
        for (let i = 0; i < this._board.size; i++) {
            if (this._board.isRowFilledByPlayer(i)) {
                return this._board.SymbolAt({X: i, Y: 0});
            }
        }

        return ' ';
    }

    private ValidateMove (symbol: Symbol) {
        const firstMove = this._lastSymbol === ' ';
        if (firstMove && symbol === 'O') {
            throw new Error("Invalid first player");
        }

        const repeatedMove = symbol === this._lastSymbol;
        if (repeatedMove) {
            throw new Error("Invalid next player");
        }
    }
}

type Coordinates = {
    X: number;
    Y: number
}
interface Tile
{
    Coordinates: Coordinates;
    Symbol: Symbol;
}

class Board
{
    private _plays : Tile[] = [];

    constructor(readonly size: number)
    {
        for (let i = 0; i < this.size; i++)
        {
            for (let j = 0; j < this.size; j++)
            {
                const tile: Tile = {
                    Coordinates: {
                        X : i,
                        Y: j
                    },
                    Symbol:" "
                };

                this._plays.push(tile);
            }
        }
    }

    private TileAt({X, Y }: Coordinates): Tile {
        const tile = this._plays.find((t:Tile) => t.Coordinates.X == X && t.Coordinates.Y == Y);

        if (!tile)
            throw new Error("Invalid Tile");

        return tile;
    }

    public isRowFilledByPlayer(row: number): boolean {
        return [...Array(this.size - 1).keys()].reduce((acc, _, column) => {
            return acc && this.SymbolAt({X:row, Y: column}) === this.SymbolAt({X: row, Y: column + 1})
        }, true) && this.SymbolAt({X: row, Y: 0}) !== ' ';
    }

    public SymbolAt(coordinate: Coordinates): Symbol {
        return this.TileAt(coordinate).Symbol;
    }

    public AddTileAt(symbol: Symbol, coordinaate: Coordinates) : void
    {
        const tile = this.TileAt(coordinaate);
        if (tile.Symbol !== ' ') {
            throw new Error("Invalid position");
        }
        tile.Symbol = symbol;
    }
}

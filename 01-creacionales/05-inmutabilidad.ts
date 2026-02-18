/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unSaveChanged: boolean;

  constructor(content: string, cursorPosition: number, unSavechanged: boolean) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unSaveChanged = unSavechanged;

  }

  copyWith({
    content,
    cursorPosition,
    unSaveChanged
  }: Partial<CodeEditorState>): CodeEditorState {

    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unSaveChanged ?? this.unSaveChanged,
    )
  }

  displayState() {
    console.log('\nEstado del editor');
    console.log(`
        Contenido: ${this.content}
        Cursor Pos: ${this.cursorPosition}
        Unsaved changes: ${this.unSaveChanged}
      `)
  }
}


class CodeEditorHistory {

  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    this.history.push(state);
    this.currentIndex++;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length -1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }

    return null;
  }

}
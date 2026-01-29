import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from '@repo/types';

@Injectable()
export class BoardService {
  private boards: Board[] = [];
  private idCounter = 1;

  create(createBoardDto: CreateBoardDto) {
    const newBoard: Board = {
      id: this.idCounter++,
      title: createBoardDto.title,
      content: createBoardDto.content,
      createdAt: new Date(),
    };
    this.boards.push(newBoard);
    return newBoard;
  }

  findAll() {
    return this.boards;
  }

  findOne(id: number) {
    const board = this.boards.find((b) => b.id === id);
    if (!board) {
      throw new NotFoundException(`"${id}"와 일치하는 게시글이 없습니다.`);
    }
    return board;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = this.findOne(id);
    if (updateBoardDto.title) board.title = updateBoardDto.title;
    if (updateBoardDto.content) board.content = updateBoardDto.content;
    return board;
  }

  remove(id: number) {
    const index = this.boards.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`"${id}"와 일치하는 게시글이 없습니다.`);
    }
    this.boards.splice(index, 1);
    return { deleted: true };
  }
}

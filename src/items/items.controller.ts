// items.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query, ParseArrayPipe, BadRequestException, Req } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { MsgParseIntPipe } from 'src/pipes/msg-parse-int.pipe';
import { JwtService } from '@nestjs/jwt';


@Controller('items')
export class ItemsController {
  constructor(
    private jwtService: JwtService, 
    private readonly itemsService: ItemsService,
    
  ) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get('search')
  searchByIds(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    // return this.itemsService.searchByIds(ids);
    return this.itemsService.searchByIdsNativeQuery(ids)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MsgParseIntPipe) id: number) {
    return this.itemsService.findOne(id); // NaN Not A Number
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe({ exceptionFactory: () => (new BadRequestException('id ควรเป็น int')) })) id: string) {
    return this.itemsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.ADMIN, Role.MANAGER])
  @Patch(':id/approve')
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.approve(id);
  }

  // add
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.ADMIN, Role.MANAGER])
  @Patch(':id/reject')
  reject(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.reject(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/edit/edit')
  searchByOwner(@Req() request: Request) {
    const token = request.headers['authorization'].replace('Bearer ', '');

    const decodedToken: any = this.jwtService.decode(token);
    const owner = decodedToken.displayname;
    return this.itemsService.searchByOwner([owner]);

  }

}

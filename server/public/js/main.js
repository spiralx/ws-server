

function formData($el) {
  return $el
    .serializeArray()
    .reduce((acc, { name, value }) => Object.assign(acc, { [name]: value }), {})
}


jQuery(function ($) {
  console.info(`jQuery loaded!`)
  console.dir($)

  const $form = $('#note-form')

  $('#note-send').click(function(ev) {
    const noteData = formData($form)

    console.dir(noteData)

    $(this).addClass('disabled')

    $.post('/note', noteData)
      .done(data => {
        console.group(`/note?${$('#note-form').serialize()}`)
        console.dir(noteData)
        console.dir(data)
        console.groupEnd()
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.group(`/note?${$('#note-form').serialize()}`)
        console.dir(noteData)
        console.warn(`${textStatus}: %o`, errorThrown)
        console.dir(jqXHR)
        console.groupEnd()
      })
      .always(() => {
        $(this).removeClass('disabled')
      })
  })
})
